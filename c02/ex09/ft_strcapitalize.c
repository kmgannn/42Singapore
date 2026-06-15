/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcapitalize.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/13 21:45:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/13 21:45:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

char	*ft_strcapitalize(char *str)
{
	int	i;          /* Index to traverse the string */
	int	new_word;   /* Flag: 1 if we're at the start of a word, 0 otherwise */

	i = 0;          /* Start at the first character */
	new_word = 1;   /* The very first letter we see will be the start of a word */
	while (str[i] != '\0') /* Loop until the null terminator (end of string) */
	{
		/* Check if the character is alphanumeric (a-z, A-Z, or 0-9) */
		if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')
			|| (str[i] >= '0' && str[i] <= '9'))
		{
			/* If it's the start of a word AND it's lowercase, make it uppercase (-32 in ASCII) */
			if (new_word == 1 && str[i] >= 'a' && str[i] <= 'z')
				str[i] = str[i] - 32;
			/* If it's NOT the start of a word AND it's uppercase, make it lowercase (+32 in ASCII) */
			else if (new_word == 0 && str[i] >= 'A' && str[i] <= 'Z')
				str[i] = str[i] + 32;
			
			new_word = 0; /* We are now inside a word, so the next char isn't a new word */
		}
		else
		{
			new_word = 1; /* Not alphanumeric (e.g. space, punctuation), so the next alphanumeric char starts a new word */
		}
		i++; /* Move to the next character */
	}
	return (str); /* Return the resulting string */
}

/*
#include <stdio.h>

int	main(void)
{
	char str3[] = "salut, comment tu vas ? 42mots cinquante+et+un";
	printf("Original: %s\n", str3);
	printf("Capitalized: %s\n", ft_strcapitalize(str3));
	return (0);
}
*/