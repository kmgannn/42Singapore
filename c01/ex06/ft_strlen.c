#include <unistd.h>
#include <stdio.h>

int	ft_strlen(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\0')
	{
		i++;
	}
	return (i);
}

int	main(void)
{
	printf("%d\n", ft_strlen("hello world\n"));
	return (0);
}

/*
i is string length counter
i = 0 initialize counter
while (str[i] != '\0') loop until null terminator
i++ add 1 to the counter
return (i) return the length
*/
