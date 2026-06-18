/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_stock_str.h                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/17 14:54:06 by kgan              #+#    #+#             */
/*   Updated: 2026/06/17 14:54:06 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#ifndef FT_STOCK_STR_H
# define FT_STOCK_STR_H

typedef struct s_stock_str
{
	int		size; /* The length of the string */
	char	*str; /* Pointer to the original string */
	char	*copy; /* Pointer to a newly allocated copy of the string */
}	t_stock_str;

#endif
