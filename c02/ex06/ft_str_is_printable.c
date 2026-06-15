/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_str_is_printable.c                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/13 21:45:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/13 21:45:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int	ft_str_is_printable(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\0')
	{
		if (str[i] < 32 || str[i] > 126)
			return (0);
		i++;
	}
	return (1);
}

/*
#include <stdio.h>

int	main(void)
{
	printf("Empty: %d\n", ft_str_is_printable(""));
	printf("Printable: %d\n", ft_str_is_printable("Hello World! 123 ~"));
	printf("Unprintable (\\n): %d\n", ft_str_is_printable("Hello\nWorld"));
	printf("Unprintable (DEL): %d\n", ft_str_is_printable("Hello\x7F"));
	return (0);
}
*/