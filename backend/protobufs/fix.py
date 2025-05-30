#!/usr/bin/env python3
"""
Script to modify protobuf generated files:
1. Add "from . " to the start of line 6 in all pb2_grpc.py files
2. Replace content inside quotes on line 4 of evaluations_grpc_pb.js with '@grpc/grpc-js'
"""

import os
import glob
import re

def modify_pb2_grpc_files():
    """Find all pb2_grpc.py files and modify every 6th line."""
    print("Looking for pb2_grpc.py files...")
    
    # Define specific paths where pb2_grpc.py files are located based on the file structure
    search_paths = [
        '../scheduler/protobuf_library',  # scheduler_pb2_grpc.py  
        '../scheduler-database/protobuf_library',  # scheduler_pb2_grpc.py
        '../users/protobuf_library',  # users_pb2_grpc.py (assumed)
        '../users-database/protobuf_library',  # users_pb2_grpc.py (assumed)
        '../evaluations-database/protobuf_library'  # evaluations_pb2_grpc.py (assumed)
    ]
    
    pb2_grpc_files = []
    
    # Search in specific directories
    for search_path in search_paths:
        if os.path.exists(search_path):
            for root, dirs, files in os.walk(search_path):
                for file in files:
                    if file.endswith('_pb2_grpc.py'):
                        pb2_grpc_files.append(os.path.join(root, file))
    
    # Also search current directory and subdirectories for any missed files
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('_pb2_grpc.py'):
                full_path = os.path.join(root, file)
                if full_path not in pb2_grpc_files:
                    pb2_grpc_files.append(full_path)
    
    if not pb2_grpc_files:
        print("No pb2_grpc.py files found.")
        return
    
    print(f"Found {len(pb2_grpc_files)} pb2_grpc.py files:")
    for file in pb2_grpc_files:
        print(f"  - {file}")
    
    # Process each file
    for file_path in pb2_grpc_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            modified = False
            # Modify only line 6 (index 5)
            if len(lines) >= 6:
                original_line = lines[5]  # 6th line (index 5)
                # Only modify if it doesn't already start with "from . "
                if not original_line.strip().startswith('from .'):
                    lines[5] = 'from . ' + original_line
                    modified = True
            
            if modified:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.writelines(lines)
                print(f"✓ Modified {file_path}")
            else:
                print(f"- No changes needed for {file_path}")
                
        except Exception as e:
            print(f"✗ Error processing {file_path}: {e}")

def modify_evaluations_grpc_pb_js():
    """Modify the evaluations_grpc_pb.js file on line 4."""
    # Based on the file structure, evaluations_grpc_pb.js is in backend/protobuf_library
    js_file_path = '../backend/protobuf_library/evaluations_grpc_pb.js'
    
    if not os.path.exists(js_file_path):
        # Fallback: search in other possible locations
        possible_paths = [
            './evaluations_grpc_pb.js',
            '../backend/evaluations_grpc_pb.js',
        ]
        
        js_file_path = None
        for path in possible_paths:
            if os.path.exists(path):
                js_file_path = path
                break
        
        # If still not found, search recursively
        if not js_file_path:
            for root, dirs, files in os.walk('..'):
                for file in files:
                    if file == 'evaluations_grpc_pb.js':
                        js_file_path = os.path.join(root, file)
                        break
                if js_file_path:
                    break
    
    if not js_file_path:
        print("evaluations_grpc_pb.js file not found.")
        return
    
    print(f"Found evaluations_grpc_pb.js at: {js_file_path}")
    
    try:
        with open(js_file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        if len(lines) < 4:
            print("File has fewer than 4 lines.")
            return
        
        # Get the 4th line (index 3)
        line_4 = lines[3]
        print(f"Original line 4: {line_4.strip()}")
        
        # Replace content inside single or double quotes with '@grpc/grpc-js'
        # This pattern matches both 'content' and "content"
        modified_line = re.sub(r"['\"][^'\"]*['\"]", "'@grpc/grpc-js'", line_4)
        
        if modified_line != line_4:
            lines[3] = modified_line
            
            with open(js_file_path, 'w', encoding='utf-8') as f:
                f.writelines(lines)
            
            print(f"✓ Modified line 4 to: {modified_line.strip()}")
        else:
            print("- No changes needed for evaluations_grpc_pb.js")
            
    except Exception as e:
        print(f"✗ Error processing {js_file_path}: {e}")

def main():
    """Main function to run both modifications."""
    print("Starting Protocol Buffers file modifications...")
    print("=" * 50)
    
    # Change to the script's directory (should be in protobufs folder)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    print(f"Working directory: {os.getcwd()}")
    
    print("\n1. Modifying pb2_grpc.py files...")
    print("-" * 30)
    modify_pb2_grpc_files()
    
    print("\n2. Modifying evaluations_grpc_pb.js...")
    print("-" * 30)
    modify_evaluations_grpc_pb_js()
    
    print("\n" + "=" * 50)
    print("Script completed!")

if __name__ == "__main__":
    main()