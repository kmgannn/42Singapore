/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_striteri.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/12 23:41:11 by kgan              #+#    #+#             */
/*   Updated: 2026/10/12 23:58:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	ft_striteri(char *s, void (*f)(unsigned int, char*))
{
	unsigned int	i;

	if (!s || !f)
		return ;
	i = 0;
	while (s[i])
	{
		f(i, &s[i]);
		i++;
	}
}
