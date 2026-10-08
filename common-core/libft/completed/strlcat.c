/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   strlcat.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/08 15:57:55 by kgan              #+#    #+#             */
/*   Updated: 2026/10/08 15:58:52 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stddef.h>

size_t	ft_strlcat(char *dst, const char *src, size_t dstsize)
{
	size_t	src_len;
	size_t	dst_len;
	size_t	i;

	src_len = ft_strlen(src);
	dst_len = ft_strlen(dst);
	
	// 1. Guard check: if buffer size is smaller or equal to current dst string
	if (dstsize <= dst_len)
		return (dstsize + src_len);

	// 2. Append characters from src onto dst
	i = 0;
	while (src[i] != '\0' && (dst_len + i) < (dstsize - 1))
	{
		dst[dst_len + i] = src[i];
		i++;
	}

	// 3. Always null-terminate the destination buffer
	dst[dst_len + i] = '\0';

	// 4. Return total length of the string we TRIED to create
	return (dst_len + src_len);
}
