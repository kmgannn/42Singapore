#include <stdio.h>
#include <string.h>

/* Function Prototypes */
int ft_strcmp(char *s1, char *s2);
int ft_strncmp(char *s1, char *s2, unsigned int n);
char *ft_strcat(char *dest, char *src);
char *ft_strncat(char *dest, char *src, unsigned int nb);
char *ft_strstr(char *str, char *to_find);
unsigned int ft_strlcat(char *dest, char *src, unsigned int size);

int main(void)
{
    printf("========== C03 TESTS ==========\n\n");

    /* ex00: ft_strcmp */
    printf("--- ex00: ft_strcmp ---\n");
    char s1[] = "Hello";
    char s2[] = "Hello";
    char s3[] = "World";
    printf("Standard strcmp (Hello, Hello): %d\n", strcmp(s1, s2));
    printf("Your ft_strcmp  (Hello, Hello): %d\n", ft_strcmp(s1, s2));
    printf("Standard strcmp (Hello, World): %d\n", strcmp(s1, s3));
    printf("Your ft_strcmp  (Hello, World): %d\n\n", ft_strcmp(s1, s3));

    /* ex01: ft_strncmp */
    printf("--- ex01: ft_strncmp ---\n");
    printf("Standard strncmp (Hello, World, 3): %d\n", strncmp(s1, s3, 3));
    printf("Your ft_strncmp  (Hello, World, 3): %d\n\n", ft_strncmp(s1, s3, 3));

    /* ex02: ft_strcat */
    printf("--- ex02: ft_strcat ---\n");
    char dest1[50] = "Hello ";
    char dest2[50] = "Hello ";
    char src[] = "World!";
    printf("Standard strcat: %s\n", strcat(dest1, src));
    printf("Your ft_strcat : %s\n\n", ft_strcat(dest2, src));

    /* ex03: ft_strncat */
    printf("--- ex03: ft_strncat ---\n");
    char ndest1[50] = "Hello ";
    char ndest2[50] = "Hello ";
    printf("Standard strncat (n=3): %s\n", strncat(ndest1, src, 3));
    printf("Your ft_strncat  (n=3): %s\n\n", ft_strncat(ndest2, src, 3));

    /* ex04: ft_strstr */
    printf("--- ex04: ft_strstr ---\n");
    char haystack[] = "This is a simple string";
    char needle[] = "simple";
    printf("Standard strstr: %s\n", strstr(haystack, needle));
    printf("Your ft_strstr : %s\n\n", ft_strstr(haystack, needle));

    /* ex05: ft_strlcat */
    printf("--- ex05: ft_strlcat ---\n");
    char ldest[50] = "Hello ";
    // Note: To test standard strlcat on Linux, you need <bsd/string.h> and -lbsd
    // For simplicity, we just test your function's return and modification:
    unsigned int ret = ft_strlcat(ldest, src, 15);
    printf("Your ft_strlcat return (size 15): %u\n", ret);
    printf("Your ft_strlcat result: %s\n\n", ldest);

    return 0;
}
