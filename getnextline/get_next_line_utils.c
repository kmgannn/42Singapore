#include <stdio.h>
#include <unistd.h>

size_t find_string_length(const char *str){
    size_t str_len = 0;
    
    while (*str){
        str++;
        str_len++;
    }
    return (str_len);
}

char *string_search(const char *stash, int c){
    if (!stash)
        return NULL;

    while (*stash != '\n' && *stash != '\0'){
        stash++;
    }
    return ((char *)stash);
}


char *join_string(char *s1, char *s2)
{
    char *dest;
    char *dest_default;

    if (!s1 || !s2)
        return (NULL);
    dest_default = (char *)malloc(find_string_length(s1) + find_string_length(s2) + 1);
    if (!dest_default)
        return (NULL);
    
    dest = dest_default;
    while (*s1)
        *dest++ = *s1++;
    while (*s2)
        *dest++ = *s2++;
    *dest = '\0';
    
    return (dest_default);
}

size_t	ft_pointer_len(const char *s)
    {
        const char *ptr;

        if (!s)
            return (0);
        ptr = s;
        while (*ptr && *ptr != '\n')
            ptr++;
        if (*ptr == '\n')
            ptr++; // include the newline if present
        return (ptr - s); 

        *ptr = '\0';
    }

char *string_splice(char *s1, char *s2){
    char *line_n;
    
    *line_n = (char *)malloc(ptr - s + 1);

    if (!s1 && !s2)
        return NULL;
    while (*line_n != '\n' || *line_n != '\0'){
        *line_n++;

    }
}
