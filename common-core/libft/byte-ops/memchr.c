/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   memchr.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/08 15:57:55 by kgan              #+#    #+#             */
/*   Updated: 2026/10/08 15:58:52 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void *memchr(const void *str, int chr, size_t n){
    unsigned int i;
    const unsigned char *s;
    unsigned char       c;

    s = (const unsigned char *)str;
    c = (unsigned char)chr;

    i = 0;   
    while ( i < n ){
        if (c == s[i]){
            return ((void *)&s[i]);
        }
        i++;
    }
    
    return (NULL);
}
