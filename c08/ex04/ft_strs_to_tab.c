/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strs_to_tab.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/17 14:54:06 by kgan              #+#    #+#             */
/*   Updated: 2026/06/17 14:54:06 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include <stdlib.h>
#include "ft_stock_str.h"

int	ft_strlen(char *str)
{
	int	i;

	i = 0;
	while (str[i])
		i++;
	return (i);
}

char	*ft_strdup(char *src)
{
	int		i;
	char	*dest;

	/* Allocate memory for the string copy + null terminator */
	dest = malloc(sizeof(char) * (ft_strlen(src) + 1)); //
	if (!dest)
		return (NULL);
	i = 0;
	while (src[i])
	{
		dest[i] = src[i]; /* Copy each character */
		i++;
	}
	dest[i] = '\0'; /* Null-terminate the new string */
	return (dest);
}

struct s_stock_str	*ft_strs_to_tab(int ac, char **av)
{
	struct s_stock_str	*arr;
	int					i;

	/* Allocate array of structs, +1 for the null-terminating struct */
	arr = malloc(sizeof(struct s_stock_str) * (ac + 1));
	if (!arr)
		return (NULL);
	i = 0;
	/* Loop through each argument */
	while (i < ac)
	{
		/* Counts then store string length */
		arr[i].size = ft_strlen(av[i]);
		/* Store original string pointer */
		arr[i].str = av[i];
		/* Store a duplicate of the string */
		arr[i].copy = ft_strdup(av[i]);
		i++;
	}
	/* Mark the end of the array by setting the last struct's str to 0 */
	arr[i].str = 0;
	return (arr);
}
