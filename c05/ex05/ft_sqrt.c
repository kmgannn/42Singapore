int	ft_sqrt(int nb)
{
	int	odd;
	int	step;

	if (nb <= 0)
		return (0);
	odd = 1;
	step = 0;
	while (nb > 0)
	{
		nb -= odd;
		odd += 2;
		step++;
	}
	if (nb == 0)
		return (step);
	return (0);
}

/*
#include <stdio.h>

int	main(void)
{
	printf("sqrt(0) = %d\n", ft_sqrt(0));
	printf("sqrt(1) = %d\n", ft_sqrt(1));
	printf("sqrt(4) = %d\n", ft_sqrt(4));
	printf("sqrt(25) = %d\n", ft_sqrt(25));
	printf("sqrt(26) = %d\n", ft_sqrt(26));
	printf("sqrt(-5) = %d\n", ft_sqrt(-5));
	printf("sqrt(2147395600) = %d\n", ft_sqrt(2147395600)); 
	return (0);
}
*/