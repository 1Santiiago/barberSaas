import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function HomeScreen() {
  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-8 flex-grow mb-20 ">
      <Card>
        <CardHeader>
          <CardTitle>Faturamento Mensal</CardTitle>
          <CardContent>R$: 0 </CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Assinantes</CardTitle>
          <CardContent>0</CardContent>
        </CardHeader>
      </Card>
    </main>
  );
}

export default HomeScreen;
