#include "libft.h"

int ft_strncmp(const char *s1, const char *s2, size_t n){
    size_t i;

    i = 0;
    while (s1[i] != '\0' && s1[i] != s2[i])
    {
        int diff;

        diff = s1[i]-s2[i];
        i++;
    }
    return (i);
};
