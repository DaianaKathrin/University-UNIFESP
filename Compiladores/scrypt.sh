flex cms.l
bison -d cms.y
gcc -c *.c
gcc -o cms *.o -ly -lfl
./cms teste1.cms
