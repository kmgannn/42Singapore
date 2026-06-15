/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcat.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/10 15:56:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/10 15:56:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* Appends the 'src' string to the end of the 'dest' string, overwriting the null byte and adding a new one. */
char	*ft_strcat(char *dest, char *src)
{
	int	i;
	int	j;

	i = 0;
	j = 0;
	while (dest[i] != '\0')
		i++;
	while (src[j] != '\0')
	{
		dest[i + j] = src[j];
		j++;
	}
	dest[i + j] = '\0';
	return (dest);
}

/*
#include <stdio.h>
int	main(void)
{
	char dest[20] = "Hello ";
	char src[] = "World";
	printf("%s\n", ft_strcat(dest, src));
	return (0);
}
*/