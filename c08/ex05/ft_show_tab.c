/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_show_tab.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/17 14:54:06 by kgan              #+#    #+#             */
/*   Updated: 2026/06/17 14:54:06 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include <unistd.h>
#include "ft_stock_str.h"

void	ft_putstr(char *str)
{
	int	i;

	i = 0;
	while (str[i])
	{
		write(1, &str[i], 1);
		i++;
	}
}

void	ft_putnbr(int n)
{
	char	c;
	long	nb;

	nb = n;
	if (nb < 0)
	{
		write(1, "-", 1);
		nb = -nb;
	}
	if (nb > 9)
		ft_putnbr(nb / 10);
	c = nb % 10 + '0';
	write(1, &c, 1);
}

void	ft_show_tab(struct s_stock_str *par)
{
	int	i;

	i = 0;
	/* Loop until we find the struct where str is 0 (the end marker) */
	while (par[i].str != 0)
	{
		/* Print the original string and a newline */
		ft_putstr(par[i].str);
		write(1, "\n", 1);
		/* Print the size and a newline */
		ft_putnbr(par[i].size);
		write(1, "\n", 1);
		/* Print the copied string and a newline */
		ft_putstr(par[i].copy);
		write(1, "\n", 1);
		i++;
	}
}
