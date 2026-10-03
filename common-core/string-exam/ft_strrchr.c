#include "libft.h"

char *ft_strrchr(const char *s, int c)
{
    // count length of string
    int len = 0;
    while (s[len] != '\0'){
        len++;
    }

    // loop backwards
    int i = len;
    while (i >= 0){
        if (s[i] == (char)c){
            return (&s[i]);
        }
        i--;
    }

    return (NULL);
}
