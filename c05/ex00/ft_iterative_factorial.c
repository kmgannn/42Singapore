int ft_iterative_factorial(int nb)
{
    if (nb == 0)
    {
        return (1);
    }
    if (nb < 0)
    {
        return (0);
    }
    else
    {
        int result = 1;
        while (nb > 0)
        {
            result = result * nb;
            nb--;
        }
        return (result);
    }
}

#include <stdio.h>
int main(void)
{
    ft_iterative_factorial(4);
    printf('%n', ft_iterative_factorial)
}