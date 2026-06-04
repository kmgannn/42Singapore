#include <stdio.h>

void ft_ulimate_div_mod(int *a, int *b)
{
    *a = *a / *b;
    *b = *a % *b;
}

int main(void)
{
    int a = 20;
    int b = 4;
    ft_ulimate_div_mod(&a, &b); //store in the memory of a and b
    printf("a = %d, b = %d\n", a, b);
    return (0);
}