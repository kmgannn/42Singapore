/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strncat.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/10 15:56:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/10 15:56:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* Appends at most 'nb' characters from 'src' to 'dest'. The resulting string is always null-terminated. */
char	*ft_strncat(char *dest, char *src, unsigned int nb)
{
	unsigned int	i;
	unsigned int	j;

	i = 0;
	while (dest[i] != '\0')
		i++;
	j = 0;
	while (src[j] != '\0' && j < nb) //
	{
		dest[i + j] = src[j];
		j++;
	}
	dest[i + j] = '\0';
	return (dest);
}

#include <stdio.h>
int	main(void)
{
	char dest[50] = "Hello ";
	char src[] = "World";
	printf("%s\n", ft_strncat(dest, src, 5));
	return (0);
}
