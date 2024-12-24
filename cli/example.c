#include <stdio.h>
#include <ctype.h>

void toUpperCase(char *str) {
    while (*str) {
        *str = toupper(*str);
        str++;
    }
}

//