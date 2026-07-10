#include <stdio.h>

void ft_tri_ptr(int ***nbr)
{
    ***nbr = 435;
}

void ft_swap(int *a, int *b)
{
    int temp;
    temp = *a;
    *a = *b;
    *b = temp;
}

void ft_div_mod(int a, int b, int *div, int *mod)
{
    *div = b/a;
    *mod = b%a;
}

void ft_ult_div_mod(int *a, int *b)
{
    int div2 = *b / *a;
    int mod2 = *b % *a;
    *b = div2;
    *a = mod2;
}

int main(void)
{
    int n1 = 3;

    int *ptr = &n1;
    int **sup_ptr = &ptr;
    int ***tri_ptr = &sup_ptr;

    ft_tri_ptr(tri_ptr);
    printf("%d\n", n1);

    int n2 = 8;
    ft_swap(&n1, &n2);
    printf("After swap: n1 = %d, n2 = %d\n", n1, n2);
    
    int div1;
    int mod1;
    ft_div_mod(n1, n2, &div1, &mod1);
    printf("div = %d, mod = %d\n", div1, mod1);

    // FIX: Give them actual numbers to calculate with before passing their addresses!
    int val1 = 10;
    int val2 = 3;
    ft_ult_div_mod(&val1, &val2);
    printf("div = %d, mod = %d\n", val1, val2);

    return 0;
}