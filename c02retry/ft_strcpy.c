char *ft_strcpy(char *dest, char *src)
{
    char *start = dest;
	while (*src != '\0')
    {
        *dest = *src;
    if (*src == '\0')
    {
        *dest = '\0';
    }
    dest++;
    src++;
    }
    return(start);
}

/*
*dest=*src is for replacing contents of dest with content of whatever is within the memory address of src

#include <stdio.h>

int main(void)
{
    // 1. Create a read-only string to copy FROM
    char source[] = "aferys"; 
    
    // 2. Create a big empty box (array) to copy TO
    char destination[50]; 

    // 3. Call your function! (No '*' needed)
    ft_strcpy(destination, source);

    // 4. Print it out to see if it worked!
    printf("Result: %s\n", destination);

    return (0);
}*/
