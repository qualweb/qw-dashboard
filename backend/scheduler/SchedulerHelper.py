from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import requests
import sys
import os

class Scheduler:
    def __init__(self, schedules):
        self.evaluations_microservice = os.getenv("EVALUATIONS_HOST", "localhost")
        self.schedules = schedules
        self.scheduler = BackgroundScheduler()
        self.load_schedules()
        self.scheduler.start()

    def load_schedules(self):
        for schedule in self.schedules:
            self.add_job(schedule)

        print("Scheduler loaded with the following schedules:", file=sys.stderr, flush=True)

        for job in self.scheduler.get_jobs():
            print(job, file=sys.stderr, flush=True)

    def add_job(self, schedule):
        global scheduler

        if schedule.schedule_type == 'one-time':
            trigger = CronTrigger(
                year=schedule.year,
                month=schedule.month,
                day=schedule.day,
                hour=schedule.hour,
                minute=schedule.minute,
                second= schedule.second
            )
            
        elif schedule.schedule_type == 'daily':
            trigger = CronTrigger(
                hour=schedule.hour,
                minute=schedule.minute,
                second=schedule.second
            )
            
        elif schedule.schedule_type == 'weekly':
            trigger = CronTrigger(
                day_of_week=schedule.day_of_week,
                hour=schedule.hour,
                minute=schedule.minute,
                second=schedule.second
            )
            
        elif schedule.schedule_type == 'monthly':
            trigger = CronTrigger(
                day=schedule.day,
                hour=schedule.hour,
                minute=schedule.minute,
                second=schedule.second
            )
            
        elif schedule.schedule_type == 'yearly':
            trigger = CronTrigger(
                month=schedule.month,
                day=schedule.day,
                hour=schedule.hour,
                minute=schedule.minute,
                second= schedule.second
            )
        else:
            raise ValueError(f"Unsupported schedule type: {schedule.schedule_type}")

        self.scheduler.add_job(
            func=self.evaluate,
            args=[schedule.monitoring_id, schedule.webpages_ids],
            trigger=trigger,
            id=str(schedule.id),
            replace_existing=True
        )

        print(f"Job added for monitoring_id: {schedule.monitoring_id} with webpages_ids: {schedule.webpages_ids}", file=sys.stderr, flush=True)
        print(f"Job details: {self.scheduler.get_job(str(schedule.monitoring_id))}", file=sys.stderr, flush=True)

    def remove_job(self, schedule_id):
        if self.scheduler.get_job(str(schedule_id)):
            self.scheduler.remove_job(str(schedule_id))
            print(f"Job with id {schedule_id} removed successfully", file=sys.stderr, flush=True)
        else:
            print(f"No job found with id {schedule_id}", file=sys.stderr, flush=True)

    def evaluate(self, monitoring_id, webpage_ids):
        print(f"Evaluating monitoring_id: {monitoring_id} with webpages_ids: {webpage_ids}", file=sys.stderr, flush=True)

        for webpage_id in webpage_ids:
            evaluation = requests.post(f'http://{self.evaluations_microservice}:8081/api/monitoring/{monitoring_id}/evaluate/{webpage_id}')
        
        if evaluation.status_code != 200:
            return {"error": "An error occurred"}, evaluation.status_code
        
        monitoring_cycle = requests.post(f'http://{self.evaluations_microservice}:8081/api/monitoring/{monitoring_id}/monitoring-cycle')
        
        if monitoring_cycle.status_code != 200:
            return {"error": "An error occurred"}, monitoring_cycle.status_code
        
        monitoring_cycle_id = monitoring_cycle.json().get("monitoring_cycle_id")
        
        add_latest_evals = requests.post(f'http://{self.evaluations_microservice}:8081/api/monitoring/monitoring-cycle/{monitoring_cycle_id}/evaluations')

        if add_latest_evals.status_code != 200:
            return {"error": "An error occurred"}, add_latest_evals.status_code
        
        score = requests.post(f'http://{self.evaluations_microservice}:8081/api/monitoring/{monitoring_id}/calculate-score')
        
        if score.status_code != 200:
            return {"error": "An error occurred"}, score.status_code