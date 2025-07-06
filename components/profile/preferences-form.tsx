'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { usePreferences, useUpdatePreferences } from '@/hooks/use-auth';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const preferencesSchema = z.object({
  favorite_genres: z.array(z.string()).optional(),
  preferred_languages: z.array(z.string()).optional(),
  email_notifications: z.boolean(),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

// Common movie genres
const MOVIE_GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
  'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
];

// Common languages
const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Korean',
  'Chinese', 'Hindi', 'Arabic', 'Portuguese', 'Russian', 'Dutch', 'Swedish'
];

export function PreferencesForm() {
  const { data: preferences, isLoading: isLoadingPreferences } = usePreferences();
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();
  const [newGenre, setNewGenre] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      favorite_genres: [],
      preferred_languages: [],
      email_notifications: true,
    },
  });

  const watchedGenres = form.watch('favorite_genres') || [];
  const watchedLanguages = form.watch('preferred_languages') || [];

  useEffect(() => {
    if (preferences) {
      form.reset({
        favorite_genres: preferences.favorite_genres || [],
        preferred_languages: preferences.preferred_languages || [],
        email_notifications: preferences.email_notifications,
      });
    }
  }, [preferences, form]);

  const onSubmit = (data: PreferencesFormData) => {
    updatePreferences(data);
  };

  const addGenre = (genre: string) => {
    if (genre && !watchedGenres.includes(genre)) {
      form.setValue('favorite_genres', [...watchedGenres, genre]);
    }
    setNewGenre('');
  };

  const removeGenre = (genre: string) => {
    form.setValue('favorite_genres', watchedGenres.filter(g => g !== genre));
  };

  const addLanguage = (language: string) => {
    if (language && !watchedLanguages.includes(language)) {
      form.setValue('preferred_languages', [...watchedLanguages, language]);
    }
    setNewLanguage('');
  };

  const removeLanguage = (language: string) => {
    form.setValue('preferred_languages', watchedLanguages.filter(l => l !== language));
  };

  if (isLoadingPreferences) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="text-center p-8">
        <p>Unable to load preferences. Please try again.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
        <CardDescription>
          Customize your MovieExplained experience with your favorite genres and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="favorite_genres"
              render={() => (
                <FormItem>
                  <FormLabel>Favorite Genres</FormLabel>
                  <FormDescription>
                    Select your favorite movie genres to get personalized recommendations.
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {watchedGenres.map((genre) => (
                          <Badge key={genre} variant="default" className="flex items-center gap-1">
                            {genre}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeGenre(genre)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a genre..."
                          value={newGenre}
                          onChange={(e) => setNewGenre(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addGenre(newGenre);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addGenre(newGenre)}
                          disabled={!newGenre}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {MOVIE_GENRES.filter(genre => !watchedGenres.includes(genre)).map((genre) => (
                          <Badge
                            key={genre}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => addGenre(genre)}
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferred_languages"
              render={() => (
                <FormItem>
                  <FormLabel>Preferred Languages</FormLabel>
                  <FormDescription>
                    Select languages for movies you&apos;d like to see recommendations for.
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {watchedLanguages.map((language) => (
                          <Badge key={language} variant="default" className="flex items-center gap-1">
                            {language}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeLanguage(language)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a language..."
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addLanguage(newLanguage);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addLanguage(newLanguage)}
                          disabled={!newLanguage}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {LANGUAGES.filter(language => !watchedLanguages.includes(language)).map((language) => (
                          <Badge
                            key={language}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => addLanguage(language)}
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email_notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>
                      Receive email notifications about new content and updates.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
