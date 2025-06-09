import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LucideIcon } from "lucide-react";
import { scaleIn } from "@/lib/animations";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
  delay?: number;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  slug,
  delay = 0,
}: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`}>
      <motion.div
        variants={scaleIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="service-card cursor-pointer"
      >
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-6">
          <Icon className="text-white" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-secondary mb-4">{title}</h3>
        <p className="text-gray-500 mb-6">{description}</p>
        <Button variant="ghost" className="text-primary hover:text-secondary p-0">
          Learn More →
        </Button>
      </motion.div>
    </Link>
  );
}
