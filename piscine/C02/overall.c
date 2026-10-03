#include <unistd.h>
#include <stdio.h>

//strcpy
char *ft_strcpy(char *dest, char *src)
{
    int i = 0;
    while (src[i] != '\0')
    {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\0';
    return dest;
}

//strncpy
char *ft_strncpy(char *dest, char *src, unsigned int n)
{
    unsigned int x;
    int i = 0;
    while (src[i] != '\0' && i < x)
    {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\0';
    return dest;
}

// char *ft_strncpy(char *dest, char *src, unsigned int n)
// {
//     unsigned int x;                 <-- 1. Look at 'x'! You created it, but never gave it a value. More importantly, why create 'x' when the function already handed you 'unsigned int n'?
//     int i = 0;                      <-- 2. Pro-tip: since 'n' is an 'unsigned int', declare 'unsigned int i = 0;' so the compiler doesn't warn you about comparing signed vs unsigned numbers!
//     while (src[i] != '\0' && i < x) <-- 3. Replace 'x' with 'n'!
//     {
//         dest[i] = src[i];
//         i++;
//     }
//     dest[i] = '\0';                 <-- 4. Watch out! Standard 'strncpy' has a very special, quirky rule about null terminators that is different from 'strcpy'!
//     return dest;
// }
