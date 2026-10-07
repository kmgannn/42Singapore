#include "libft.h"

char *ft_strrchr(const char *s, int c)
{
    int len = 0;
    while (s[len] != '\0'){
        len++;
    }

    int i = len;
    while (i >= 0){
        if (s[i] == (char)c){
            return (&s[i]);
        }
        i--;
    }

    return (NULL);
}

/*char *ft_strrchr(const char *s, int c)
{
    // Start a pointer at the end of the string (on the '\0')
    const char *ptr = s + ft_strlen(s);

    while (1)
    {
        if (*ptr == (char)c)
            return ((char *)ptr);
        
        // Stop condition: we checked index 0 (s) and found no match
        if (ptr == s)
            break;
            
        ptr--;
    }

    return (NULL);
}*/