import os

html_files = []
for root, dirs, files in os.walk('c:/Users/patna/Downloads/Compressed/SIH_Kizen_Krew-main/SIH_Kizen_Krew-main'):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'max-w-7xl' in content:
        content = content.replace('max-w-7xl', 'w-full')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filepath}')
