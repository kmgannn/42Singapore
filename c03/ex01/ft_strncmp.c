/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strncmp.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kgan <marvin@42.fr>                        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/06/10 15:35:00 by kgan              #+#    #+#             */
/*   Updated: 2026/06/10 15:35:00 by kgan             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int	ft_strncmp(char *s1, char *s2, unsigned int n)
{
	unsigned int	i;

	if (n == 0)
		return (0);
	i = 0;
	while (s1[i] == s2[i] && s1[i] != '\0' && i < n - 1)
	{
		i++;
	}
	return ((unsigned char)s1[i] - (unsigned char)s2[i]);
}


int	ft_strncmp(char *s1, char *s2, unsigned int n)
{
	unsigned int	i;

	i = 0;
	while (i < n)
	{
		if (s1[i] != s2[i] || s1[i] == '\0')
		{
			return ((unsigned char)s1[i] - (unsigned char)s2[i]);
		}
		i++;
	}
	return (0);
}

int	ft_strncmp(char *s1, char *s2, unsigned int n)
{
	unsigned int	i;

	i = 0;
	while (i < n)
	{
		// Ask: Are they the same character AND not the end of the string?
		if (s1[i] == s2[i] && s1[i] != '\0')
		{
			// Yes! Move to the next box.
			i++;
		}
		else
		{
			// No! They either mismatched, OR we hit the end of the strings ('\0').
			// Return the difference immediately.
			return ((unsigned char)s1[i] - (unsigned char)s2[i]);
		}
	}
	
	// If the loop finishes 'n' times without hitting the 'else', they matched perfectly.
	return (0);
}
