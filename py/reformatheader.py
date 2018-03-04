from tempfile import mkstemp
from shutil import move
import os
import re
import fileinput

filename_re = re.compile('[0-9]{4}-[0-9]{2}-[0-9]{2}-code-journal\.md')
title_re = re.compile('^title: Code Journal - ((Jan|Feb) ([0-9]{1,2}))$');

for file in os.listdir('.'):
    # file = '2018-01-23-code-journal.md'
    dstr = ''
    month = ''
    dnum = ''

    file_already_fixed = False

    if filename_re.match(file):
        print('match')

        for line in fileinput.input(file, inplace=True):
            line = line.rstrip()

            if file_already_fixed:
                print(line)
                continue

            if line.startswith('title:'):
                m = title_re.match(line)

                if not m:
                    file_already_fixed = True
                    print(line)
                    continue

                dstr = m.group(1)
                month = m.group(2)
                dnum = m.group(3)

                print('title: Code Journal')

            elif line.startswith('description:'):
                print('description: ' + dstr)

            elif line.startswith('# ' + dstr):
                pass

            else:
                print(line)

        fileinput.close()



