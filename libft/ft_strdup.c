/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strdup.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/08 15:57:55 by kgan              #+#    #+#             */
/*   Updated: 2026/10/12 23:58:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strdup(const char *s)
{
	char	*dest;
	size_t	len;

	len = ft_strlen(s);
	dest = (char *)malloc(sizeof(char) * (len + 1));
	if (!dest)
		return (NULL);
	ft_memcpy(dest, s, len + 1);
	return (dest);
}
