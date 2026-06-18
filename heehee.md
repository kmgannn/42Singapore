#include <unistd.h>

static void	ft_putnbr(int n)
{
	char	c;

	if (n < 0)
	{
		write(1, "-", 1);
		n = -n;
	}
	if (n > 9)
		ft_putnbr(n / 10);
	c = (n % 10) + '0';
	write(1, &c, 1);
}

/*
**	main – prints argc and every argv element.
**	argc is the number of arguments (including the program name).
**	argv[i] is a C‑string; write(...,0) prints the whole string.
*/
int	main(int argc, char **argv)
{
	int	i;

	i = 0;
	write(1, "argc = ", 7);
	ft_putnbr(argc);
	write(1, "\n", 1);
	while (i < argc)
	{
		write(1, "argv[", 5);
		ft_putnbr(i);
		write(1, "] = ", 4);
		write(1, argv[i], 1000);
		write(1, "\n", 1);
		i++;
	}
	return (0);
}
