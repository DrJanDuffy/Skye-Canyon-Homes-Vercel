import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Send } from "lucide-react";

const leadFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  timeframe: z.string().optional(),
  priceRange: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, "You must agree to receive communications"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export default function LeadCaptureForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      timeframe: "",
      priceRange: "",
      message: "",
      consent: false,
    },
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: Omit<LeadFormData, 'consent'>) => {
      return apiRequest('POST', '/api/leads', {
        ...data,
        source: 'Sky Canyon Website - Lead Capture Form'
      });
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
      toast({
        title: "Thank you!",
        description: "Your information has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit your information. Please try again.",
        variant: "destructive",
      });
      console.error('Failed to create lead:', error);
    },
  });

  const onSubmit = (data: LeadFormData) => {
    const { consent, ...leadData } = data;
    createLeadMutation.mutate(leadData);
  };

  if (showSuccess) {
    return (
      <section id="contact" className="py-16 bg-realscout-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            <div className="text-green-600 mb-4">
              <CheckCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              I'll be in touch within 24 hours to discuss your Sky Canyon home search.
            </p>
            <Button 
              onClick={() => setShowSuccess(false)}
              className="bg-realscout-blue text-white hover:bg-realscout-navy"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 bg-realscout-blue">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Sky Canyon Home?
          </h2>
          <p className="text-xl opacity-90">
            Get personalized listings and expert guidance from Dr. Jan Duffy
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your first name" 
                          className="focus:ring-realscout-blue focus:border-realscout-blue"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your last name" 
                          className="focus:ring-realscout-blue focus:border-realscout-blue"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your.email@example.com" 
                          className="focus:ring-realscout-blue focus:border-realscout-blue"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="(555) 123-4567" 
                          className="focus:ring-realscout-blue focus:border-realscout-blue"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buying Timeframe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-realscout-blue focus:border-realscout-blue">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="immediate">Within 30 days</SelectItem>
                          <SelectItem value="short">1-3 months</SelectItem>
                          <SelectItem value="medium">3-6 months</SelectItem>
                          <SelectItem value="long">6+ months</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-realscout-blue focus:border-realscout-blue">
                            <SelectValue placeholder="Select price range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="500k-750k">$500K - $750K</SelectItem>
                          <SelectItem value="750k-1m">$750K - $1M</SelectItem>
                          <SelectItem value="1m-1.5m">$1M - $1.5M</SelectItem>
                          <SelectItem value="1.5m+">$1.5M+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your ideal home in Sky Canyon..."
                        className="focus:ring-realscout-blue focus:border-realscout-blue"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="focus:ring-realscout-blue"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I agree to receive communications about Sky Canyon properties and market updates *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={createLeadMutation.isPending}
                  className="bg-realscout-blue text-white px-8 py-4 text-lg hover:bg-realscout-navy"
                >
                  {createLeadMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Get My Custom Property Search
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  I'll respond within 24 hours with personalized recommendations
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
