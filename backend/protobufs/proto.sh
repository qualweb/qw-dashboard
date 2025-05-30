#!/bin/bash

# Script to execute all .sh files and fix.py in the protobufs directory

echo "Starting execution of all scripts..."
echo "=" * 50

# Make sure all .sh files are executable
echo "Making .sh files executable..."
chmod +x compile_proto_evaluations.sh
chmod +x compile_proto_scheduler.sh  
chmod +x compile_proto_users.sh

source myenv/bin/activate

# Execute the .sh files
echo ""
echo "1. Executing compile_proto_evaluations.sh..."
echo "-" * 40
./compile_proto_evaluations.sh
if [ $? -eq 0 ]; then
    echo "✓ compile_proto_evaluations.sh completed successfully"
else
    echo "✗ compile_proto_evaluations.sh failed with exit code $?"
fi

echo ""
echo "2. Executing compile_proto_scheduler.sh..."
echo "-" * 40
./compile_proto_scheduler.sh
if [ $? -eq 0 ]; then
    echo "✓ compile_proto_scheduler.sh completed successfully"
else
    echo "✗ compile_proto_scheduler.sh failed with exit code $?"
fi

echo ""
echo "3. Executing compile_proto_users.sh..."
echo "-" * 40
./compile_proto_users.sh
if [ $? -eq 0 ]; then
    echo "✓ compile_proto_users.sh completed successfully"
else
    echo "✗ compile_proto_users.sh failed with exit code $?"
fi

echo ""
echo "4. Executing fix.py..."
echo "-" * 40
python3 fix.py
if [ $? -eq 0 ]; then
    echo "✓ fix.py completed successfully"
else
    echo "✗ fix.py failed with exit code $?"
fi

echo ""
echo "=" * 50
echo "All scripts execution completed!"
echo "Check the output above for any errors."