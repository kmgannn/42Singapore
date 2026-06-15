/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcmp.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/10 15:35:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/10 15:35:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include <stdio.h>

/* Compares two strings character by character. Returns the difference of the first non-matching characters. */
int	ft_strcmp(char *s1, char *s2)
{
	int	i;

	i = 0;
	while (s1[i] == s2[i] && s1[i] != '\0')
	{
		i++;
	}
	return ((unsigned char)s1[i] - (unsigned char)s2[i]);
}
