/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   memcmp.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/08 15:57:55 by kgan              #+#    #+#             */
/*   Updated: 2026/10/08 15:58:52 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

int ft_memcmp(const void *s1, const void *s2, size_t n){
    unsigned int i;
    unsigned char *n1, n2;
    n1 = (unsigned char *)s1;
    n2 = (unsigned char *)s2;

    i = 0;
    if ( n = 0 )
        return (0);

    while ( i < n ){
        if (n1[i] == n2[i]){
            return ;
            i++;
        }
    }
}
