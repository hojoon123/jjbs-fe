'use client';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

interface OrderHistoryListProps {
  orders: Order[];
}

export function OrderHistoryList({ orders }: OrderHistoryListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문 번호</TableHead>
          <TableHead>날짜</TableHead>
          <TableHead>총액</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>상세</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.total.toLocaleString()}원</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">상세 보기</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}