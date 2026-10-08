/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   strlcpy.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/08 15:57:55 by kgan              #+#    #+#             */
/*   Updated: 2026/10/08 15:58:52 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

size_t ft_strlcpy(char *dst, const char *src, size_t dstsize){
    size_t src_len;
    size_t i;

    src_len = ft_strlen(src);

    if (dstsize == 0)
        return (src_len);

    i =0;
    while (src[i] != '\0' && i < dstsize -1){
        dst[i] = src[i];
        i++;
    }
    dst[i] = '\0';

    return (src_len);
}
