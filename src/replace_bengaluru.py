import os
import re

directory = '/Users/applemacmini05/Desktop/Repos/mr_constructions/src'

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace "Bangalore" or "Banglore" (case insensitive) with "Bengaluru"
    # EXCEPT when it is part of a URL or file path (e.g. contains %20 or / nearby)
    # A simple regex: match Bangalore/Banglore not preceded by %20 or / and not followed by / or .webp
    
    # Actually, a better way is to parse line by line.
    lines = content.split('\n')
    new_lines = []
    changed = False
    
    for line in lines:
        if 'webp' in line or 'img:' in line or 'heroBg:' in line or 'mobile1:' in line or 'mobile2:' in line or 'desktopLeft:' in line or 'desktopRight:' in line or 'img1:' in line or 'img2:' in line or 'image:' in line or 'img=' in line or 'src=' in line:
            # If the line contains an image path, we might still have "subtitle: 'Bangalore'" in it!
            # Example: { id: "h1", title: "Bowring Hospital", subtitle: "Bangalore", img: "/hospital/Bowring%20Hospital-%20Bangalore/Bowring%20hospital1.webp" }
            # Let's just replace subtitle: "Bangalore" specifically
            new_line = re.sub(r'(subtitle:\s*")Bangalore(")', r'\1Bengaluru\2', line, flags=re.IGNORECASE)
            new_line = re.sub(r'(projects:\s*".*?)Bangalore(.*?"]?)', r'\1Bengaluru\2', new_line, flags=re.IGNORECASE)
            if new_line != line:
                changed = True
            new_lines.append(new_line)
        else:
            # Safe to replace
            new_line = line
            new_line = re.sub(r'\bBANGALORE\b', 'BENGALURU', new_line)
            new_line = re.sub(r'\bBangalore\b', 'Bengaluru', new_line)
            new_line = re.sub(r'\bBanglore\b', 'Bengaluru', new_line)
            new_line = re.sub(r'\bbangalore\b', 'bengaluru', new_line)
            new_line = re.sub(r'\bbanglore\b', 'bengaluru', new_line)
            if new_line != line:
                changed = True
            new_lines.append(new_line)
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.jsx', '.js')):
            replace_in_file(os.path.join(root, file))
