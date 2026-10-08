/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   memcpy.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/08 15:57:55 by kgan              #+#    #+#             */
/*   Updated: 2026/10/08 15:58:52 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void *ft_memcpy(void *dst, const void *src, size_t n){
    unsigned char *d;
    const unsigned char *s;
    size_t i;

    d = (unsigned char *)dst;
    s = (unsigned char *)src;

    if (!dst && !src)
        return (NULL);

    i = 0;
    while (i < n){
        d[i] =s[i];
        i++;
    }
    return (d);
}
