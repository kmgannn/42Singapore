/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_rev_params.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <kgan@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/17 14:54:06 by kgan              #+#    #+#             */
/*   Updated: 2026/06/17 14:54:06 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>

int	main(int argc, char **argv)
{
	int	param;
	int	letter;

	param = argc - 1;
	while (param > 0)
	{
		letter = 0;
		while (argv[param][letter] != '\0')
		{
			write(1, &argv[param][letter], 1);
			letter++;
		}
		write(1, "\n", 1);
		param--;
	}
	return (0);
}
