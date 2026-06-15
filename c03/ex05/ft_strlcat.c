/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strlcat.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/10 15:56:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/10 15:56:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/*
strlcat() take the full size of the buffer (not just the length) and guarantee to NUL-terminate the result (as long as size is larger than 0 or, in the case of strlcat(), as long as there is at least one byte free in dst).

The strlcat() function appends the NUL-terminated string src to the end of dst.  It will append at most size - strlen(dst) - 1 bytes, NUL-terminating the result.

so does it add the NULL to src first then adds?

adds the length of src and dest

count length of src and dest
*/

/* Appends 'src' to 'dest' ensuring total length does not exceed 'size' - 1. Returns the total length it tried to create. */
unsigned int ft_strlcat(char *dest, char *src, unsigned int size)
{
    unsigned int i;
    unsigned int j;

    i = 0;
    j = 0;

    // loop the destination and count the length
    while (dest[i] != '\0') //it checks every condition, eg is dest[0] = NULL? ... is dest[12] = NULL? if yes it breaks out of the loop
    {
        i++;
    }

    // loop the source and count the length
    while (src[j] != '\0')
    {
        j++;
    }

    if (str [i+j] < size)
        return  (1);
/* (0) is the normal condition, (1) is the error? */
}