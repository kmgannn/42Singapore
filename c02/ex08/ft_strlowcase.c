/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strlowcase.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/13 21:45:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/13 21:45:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

char	*ft_strlowcase(char *str)
{
	int	i; /* Index used to traverse the string */

	i = 0; /* Start at the first character */
	while (str[i] != '\0') /* Loop until we hit the null terminator (end of string) */
	{
		/* Check if the current character is an uppercase letter between 'A' and 'Z' */
		if (str[i] >= 'A' && str[i] <= 'Z')
			str[i] = str[i] + 32; /* Add 32 to its ASCII value to make it lowercase */
		i++; /* Move to the next character */
	}
	return (str); /* Return the modified string */
}

/*
#include <stdio.h>

int	main(void)
{
	char str2[] = "HELLO World! 123";
	printf("Original: %s\n", str2);
	printf("Lowercase: %s\n", ft_strlowcase(str2));
	return (0);
}
*/