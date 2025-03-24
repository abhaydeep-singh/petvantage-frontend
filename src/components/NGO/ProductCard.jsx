import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "../ui/button";

function ProductCard() {
  return (
    <div>
      <Card className="w-[190px] bg-accent md:w-[270px] md:h-[53vh]">
      
      <CardContent className="p-0">
        <div className="flex justify-center">
        <img src="/images/dummyProduct.png" className="w-[70%]" alt="" />
        </div>
      </CardContent>

      {/* Not a Header actually, but i placed it here */}
      <CardHeader className="p-3">
        <CardTitle>Sara's Food</CardTitle>
        <CardDescription>Sara's Wholesome Food Chicken Biryani - 300 g</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-3">
        <Button variant="default">Edit</Button>
        <Button variant="destructive">Delete</Button>
        
      </CardFooter>
    </Card>
    </div>
  );
}

export default ProductCard;
