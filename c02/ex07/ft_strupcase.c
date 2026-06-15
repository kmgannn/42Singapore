/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strupcase.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/13 21:45:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/13 21:45:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

char	*ft_strupcase(char *str)
{
	int	i; /* Index used to traverse the string */

	i = 0; /* Start at the first character */
	while (str[i] != '\0') /* Loop until we hit the null terminator (end of string) */
	{
		/* Check if the current character is a lowercase letter between 'a' and 'z' */
		if (str[i] >= 'a' && str[i] <= 'z')
			str[i] = str[i] - 32; /* Subtract 32 from its ASCII value to make it uppercase */
		i++; /* Move to the next character */
	}
	return (str); /* Return the modified string */
}

/*
#include <stdio.h>

int	main(void)
{
	char str1[] = "hello World! 123";
	printf("Original: %s\n", str1);
	printf("Uppercase: %s\n", ft_strupcase(str1));
	return (0);
}
*/