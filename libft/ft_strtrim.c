/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strtrim.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42singapore.sg>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/10/12 23:41:11 by kgan              #+#    #+#             */
/*   Updated: 2026/10/12 23:58:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strtrim(char const *s1, char const *set)
{
	size_t	start;
	size_t	end;

	if (!s1 || !set)
		return (NULL);
	start = 0;
	while (s1[start] && ft_strchr(set, s1[start]))
		start++;
	end = ft_strlen(s1);
	while (end > start && ft_strchr(set, s1[end - 1]))
		end--;
	return (ft_substr(s1, start, end - start));
}
