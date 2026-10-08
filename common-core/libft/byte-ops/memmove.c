/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   memmove.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/08 15:57:55 by kgan              #+#    #+#             */
/*   Updated: 2026/10/08 15:58:52 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void *memmove(void *dst, const void *src, size_t n){
    unsigned char *d;
    const unsigned char *s;
    size_t i;
    size_t j;

    d = (unsigned char *)dst;
    s = (unsigned char *)src;

    if (!dst && !src)
        return (NULL);
    
    // left to right
    if ( d < s ){
        while ( n > 0 ){
        *d = *s;
        n--, d++, s++;
        }
    }

    // right to left
    if ( s < d ){
        while ( n > 0 ){
        n--;
        d[n] = s[n];
        }
    }

    return (dst);
}
