import os
import re

p = re.compile('code-journal-([0-9]{4}-[0-9]{2}-[0-9]{2})\.md')

for file in os.listdir('.'):
    m = p.match(file)
    os.rename(file, m.group(1)+'-code-journal.md')
