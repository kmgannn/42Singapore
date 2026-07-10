#include <unistd.h>

//print function
void put_char(char c)
{
    write(1, &c, 1);
}

void print_char(void)
{
    put_char('a');
}

void print_alphabets_rev(void)
{
    char c = 'z';
    while (c <= 'z' && c >= 'a')
    {
    put_char(c);
    c = c - 1;
    }
}

void ft_is_negative(int n)
{
    if (n < 0)
    {
        put_char('N');
    }
    else 
        put_char('P');
}

void ft_print_comb2(void)
{
    int i = 0;
    while (i < 99)
    {
        int j = i+1;
        while (j < 100)
        {
            {
                put_char((i / 10) + '0');
                put_char((i % 10) + '0');
                put_char(' ');
                put_char((j / 10) + '0');
                put_char((j % 10) + '0');
                if (i != 98 || j != 99)
                {
                put_char(',');
                put_char(' ');
                }
            }
            j++;
        }
        i++;
    }
}

void ft_putnbr(int nb)
{
    int i = nb;
    if (i == -2147483648)
    {
        write(1, "-2147483648", 11);
        return;
    }
    if (i < 0 && i != -2147483648)
    {
        put_char('-');
        i = -nb;
    }
    if (i > 9)
    {
        ft_putnbr(i/10);
    }
    put_char((i%10)+'0');
}

// void ft_print_combn(int n)
// {
//     s
// }

int main(void)
{
    print_char();
        put_char('\n');
    print_alphabets_rev();
        put_char('\n');
    ft_is_negative(-100);
        put_char('\n');
    ft_print_comb2();
        put_char('\n');
    ft_putnbr(-2147483648);
        put_char('\n');
    return(0);
}
