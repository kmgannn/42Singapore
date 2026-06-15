/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strstr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/10 15:56:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/10 15:56:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* Finds the first occurrence of the substring 'to_find' in 'str'. Returns a pointer to the located substring. */
char	*ft_strstr(char *str, char *to_find)
{
	int	i;
	int	j;

	if (to_find[0] == '\0')
		return (str);
	i = 0;
	while (str[i] != '\0')
	{
		j = 0;
		while (to_find[j] != '\0')
		{
			if (str[i + j] == to_find[j])
				j++;
			else
				break ;
		}
		if (to_find[j] == '\0')
			return (&str[i]);
		i++;
	}
	return (0);
}


#include <stdio.h>
int	main(void)
{
	char str[] = "Hello World";
	char to_find[] = "World";
	printf("%s\n", ft_strstr(str, to_find));
	return (0);
}

