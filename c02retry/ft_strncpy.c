char *ft_strncpy(char *dest, char *src, unsigned int n)
{
    unsigned int i;

    i = 0;
    char *start = dest;
	while (*src != '\0') //let's say we are copying src[n], condition ends when we hit n  
    {
        *dest = *src;
        if (*src == '\0' && i < n)
        {
            *dest = '\0';
        }
        dest++;
        src++;
    }
    i++;
    return(start);
}