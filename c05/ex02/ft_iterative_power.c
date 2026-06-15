int ft_iterative_power(int nb, int power)
{
    if (power < 0)
    {
        power = 0;
    }
    int result = 1;
    while (power > 0)
    {
        result = (nb*result);
        power--;
    }
    return (result);
}

/*
5^4 = 5x5x5x5
*/