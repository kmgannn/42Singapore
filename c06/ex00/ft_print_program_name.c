/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_print_program_name.c                            :+:      :+:    :+:   */
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

	param = 0;
	while (param < 1 && argc > 0) //main logic, param<1 to select the name and argc to comply with compiler
	{
		letter = 0;
		while (argv[param][letter] != '\0')
		{
			write(1, &argv[param][letter], 1);
			letter++;
		}
		write(1, "\n", 1);
		param++;
	}
	return (0);
}
